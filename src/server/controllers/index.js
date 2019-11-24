
import router from 'koa-simple-router';
import IndexController from "./IndexController";
const indexController = new IndexController();
// import BooksController from "./BooksController";
// const booksController = new BooksController();
const controllersInit = (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex)
        _.get('/home', indexController.homeIndex)
        // _.get('/books/list',booksController.actionIndex)
        // _.get('/books/create', booksController.actionCreate);
    }))
}

export default controllersInit;

