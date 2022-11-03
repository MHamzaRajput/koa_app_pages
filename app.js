const koa = require('koa');
const koaRouter = require('koa-router');
const cors = require('@koa/cors');
const koaLogger = require('koa-logger')
const koaBody = require('koa-bodyparser');
const koaHelmet = require('koa-helmet');
const koaViews = require('koa-views');
const log = console.log;
const app = new koa();
const PORT = 4579;
const router = koaRouter();

router.get("/", ctx => {
	ctx.state = { ...ctx.request.query }
	return ctx.render('./index.hbs');
});

app
	.use(koaHelmet())
	.use(koaLogger())
	.use(koaBody({ jsonLimit: '100mb', formLimit: '100mb', textLimit: '100mb' }))
	.use(cors())
	.use(koaViews('./views', { map: { hbs: 'handlebars' } }))
	.use(router.routes())
	.use(router.allowedMethods())

app.listen(PORT, () => log("server started on port:", PORT));