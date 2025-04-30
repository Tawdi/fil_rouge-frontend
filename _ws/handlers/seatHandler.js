const handleSeatSelection = (io, socket, redisClient) => {

  socket.on("seance:join", ({ seanceId }) => {
    socket.join(`seance-${seanceId}`);
    console.log(`Socket ${socket.id} joined room seance-${seanceId}`);
  });

  socket.on("seat:select", async ({ seanceId, row, col, userId }) => {
    const seatKey = `seance:${seanceId}:seat:${row}-${col}`;
    // console.log(`Received seat:select  Seance: ${seanceId}, Row: ${row}, Col: ${col}, User: ${userId}`);

    try {
      const existing = await redisClient.get(seatKey);
      // console.log(`Redis check for key ${seatKey}:`, existing);

      if (existing && existing !== userId.toString()) {
        // console.log(`Seat already held by another user (${existing}), ignoring`);
        return;
      }

      await redisClient.set(seatKey, userId.toString(), { EX: 600 });
      // console.log(`Seat held successfully for user ${userId} → ${seatKey}`);

      io.to(`seance-${seanceId}`).emit("seat:selected", { seanceId, row, col, userId });
      // console.log(`Broadcasted seat:selected  Seance: ${seanceId}, Row: ${row}, Col: ${col}`);
    } catch (error) {
      console.error("Error selecting seat:", error);
    }
  });

  socket.on("seat:confirm", async ({ seanceId, row, col, userId }) => {
    const seatKey = `seance:${seanceId}:seat:${row}-${col}`;

    try {
      const existing = await redisClient.get(seatKey);

      if (!existing || existing !== userId.toString()) {
        console.log(`Seat ${row}-${col} is not held by user ${userId}. Confirmation failed.`);
        return;
      }

      await redisClient.del(seatKey);
      io.to(`seance-${seanceId}`).emit("seat:confirmed", { seanceId, row, col, userId });
  
      console.log(`Seat ${row}-${col} confirmed successfully for user ${userId}`);
  
    } catch (error) {
      console.error("Error confirming seat:", error);
    }
  });


  socket.on("seat:release", async ({ seanceId, row, col, userId }) => {
    const seatKey = `seance:${seanceId}:seat:${row}-${col}`;
    // console.log(`Received seat:release Seance: ${seanceId}, Row: ${row}, Col: ${col}, User: ${userId}`);

    try {
      const currentHolder = await redisClient.get(seatKey);

      if (currentHolder === userId.toString()) {
        await redisClient.del(seatKey);
        console.log(`Seat released by user ${userId} → ${seatKey}`);

        io.to(`seance-${seanceId}`).emit("seat:released", { seanceId, row, col });
        // console.log(`Broadcasted seat:released Seance: ${seanceId}, Row: ${row}, Col: ${col}`);
      } else {
        console.log(`User ${userId} is not the holder of seat ${seatKey}, no action taken`);
      }
    } catch (error) {
      console.error("Error releasing seat:", error);
    }
  });

  socket.on("seat:getHeld", async ({ seanceId, userId }) => {
    try {
      const pattern = `seance:${seanceId}:seat:*`;
      const keys = await redisClient.keys(pattern);
  
      const heldByUser = [];
      const heldByOthers = [];
  
      for (const key of keys) {
        const holder = await redisClient.get(key);
        const [ , , , rowCol] = key.split(":");
        const [row, col] = rowCol.split("-").map(Number);

        if (holder === userId.toString()) {
          heldByUser.push({ row, col });
        } else {
          heldByOthers.push({ row, col });
        }
      }
      socket.emit("seat:heldList", {
        seanceId,
        heldByUser,
        heldByOthers
      });
    } catch (error) {
      console.error("Error fetching held seats:", error);
    }
  });
  

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
};

module.exports = handleSeatSelection;
