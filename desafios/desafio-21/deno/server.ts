import { Application, Router, Context, helpers } from "https://deno.land/x/oak@v11.1.0/mod.ts"

const app = new Application();
const router = new Router();

const sortPhrase = (frase: string): string => {
    const phrase = frase.split(" ");
    let invertedPhrase = "";
    for(let i=phrase.length-1; i>=0; i--){
        invertedPhrase += `${phrase[i]} `; 
    }
    return invertedPhrase;
}

router.get("/", (ctx: Context) => {
    const { frase } = helpers.getQuery(ctx, { mergeParams: true });
    ctx.response.status = 201;
    ctx.response.body = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Server oak</title>
            </head>
            <body>
                <h1>${sortPhrase(frase)}</h1>
            </body>
        </html>
    `
})

app.use(router.routes());
app.use(router.allowedMethods())

app.listen({port: 3000});
console.log("Server listening http:127.0.0.1:3000");