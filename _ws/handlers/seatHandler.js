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


  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
};

module.exports = handleSeatSelection;
