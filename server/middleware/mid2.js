const db = require("../db/userschema");
let roomid;
const roomCheck = async (room) => {
  await db
    .aggregate([
      {
        $match: {
          user1: room.user,
        },
      },
      {
        $match: {
          user2: room.chatpartner,
        },
      },
    ])
    .then(async (resl) => {
      if (resl.length > 0) {
        roomid = await resl[0].room;
        console.log(resl[0] + " first condition");
        return roomid;
        console.log("first not return");
      } else {
        db.aggregate([
          {
            $match: {
              user1: room.chatpartner,
            },
          },
          {
            $match: {
              user2: room.user,
            },
          },
        ]).then(async (rest) => {
          if (rest.length > 0) {
            roomid = await rest[0].room;
            console.log(rest[0].room + " second condition");

            return roomid;
            console.log("not returning second condition");
          } else {
            let newdb = new db({
              user1: room.user,
              user2: room.chatpartner,
              room: room.user + room.chatpartner,
              chat: [
                {
                  date: room.date,
                  message: "",
                },
              ],
            });
            await newdb.save();
            roomid = room.user + room.chatpartner;
            console.log(roomid + "create new user");

            return roomid;
          }
        });
      }
    });
  console.log(roomid, "roomid fuction returning");
  return roomid;
};
module.exports = roomCheck;

/*
async (err, resl) => {
      if (err) console.log(err);
      else if (resl.length > 0) {
        roomid = await resl[0].room;
        console.log(roomid + " first condition");

        return roomid;
      } else {
        db.aggregate(
          [
            {
              $match: {
                user1: room.chatpartner,
              },
            },
            {
              $match: {
                user2: room.user,
              },
            },
          ],
          async (error, rest) => {
            if (error) console.error();
            else if (rest.length > 0) {
              roomid = await rest[0].room;
              console.log(roomid + " second condition");

              return roomid;
            } else {
              let newdb = new db({
                user1: room.user,
                user2: room.chatpartner,
                room: room.user + room.chatpartner,
                chat: {
                  msg: {
                    date: room.date,
                    message: "",
                  },
                },
              });
              await newdb.save();
              roomid = room.user + room.chatpartner;
              console.log(roomid + "create new user");

              return roomid;
            }
          }
        );
      }
    }
*/
