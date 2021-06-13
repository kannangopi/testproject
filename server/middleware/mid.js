const db = require("../db/userschema");
const roomid = null;
const roomCheck = (room) => {
  db.aggregate(
    [
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
    ],
    (err, resl) => {
      if (err) console.log(err);
      else if (resl.length > 0) {
        console.log(resl[0].room + " first condition");
        return resl[0].room;
        // roomid = resl[0].room;
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
          (error, rest) => {
            if (error) console.error();
            else if (rest.length > 0) {
              console.log(rest[0].room + " second condition");
              return rest[0].room;
              // roomid = rest[0].room;
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
              newdb.save();
              console.log(room.user + room.chatpartner + "create new user");
              return room.user + room.chatpartner;
              // roomid = room.user + room.chatpartner;
            }
          }
        );
      }
    }
  );
  // db.find({}, (err, res) => {
  //   if (err) console.log(err);
  //   else {
  //     if (res.length > 0) {
  //       let newdb = new db({
  //         user1: room.user,
  //         user2: room.chatpartner,
  //         room: room.user + room.chatpartner,
  //         chat: {
  //           msg: {
  //             date: room.date,
  //             message: "",
  //           },
  //         },
  //       });
  //       newdb.save();
  //     } else {
  //       console.log("room exist");
  //       console.log(res);
  //     }
  //   }
  // });
};
module.exports = roomCheck;
