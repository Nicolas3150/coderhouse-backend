import jwt from "jsonwebtoken";

const privateKey = "coderhouse";

export default async (ctx, next) => {
  if (!ctx.headers.authorization) ctx.throw(403, "No token.");

  const token = ctx.headers.authorization.split(" ")[1];

  try {
    ctx.request.jwtPayload = jwt.verify(token, privateKey);
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
  }

  await next();
};

// export default async (ctx, next) => {
//   const authHeader = ctx.headers.authorization;
//   if (!authHeader) {
//     return (
//       (ctx.response.status = 401),
//       (ctx.body = {
//         status: "Unauthorized",
//         message: "You dont hace permission to visit this page",
//       })
//     );
//   }
//   const token = authHeader.split(" ")[1];

//   jwt.verify(token, privateKey, async (err, decodedPayload) => {
//     if (err) {
//       ctx.response.status = 401;
//       ctx.body = {
//         status: "Unauthorized",
//         message: "You dont hace permission to visit this page",
//       };
//     }

//     await next();
//   });
// };
