/* eslint no-unused-vars: 'off' */
// const assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../../app');
chai.use(chaiHttp);

const dataWithBadRepeat = {
    password: 'pass',
    name: 'Super Name',
    email: 'mail@mail.ru',
    passwordRepeat: 'password'
};
const dataBadSpaces = {
    password: ' ',
    name: ' ',
    email: ' ',
    passwordRepeat: ' '
};
const repeatData = {
    password: '1',
    name: 'Name',
    email: 'mail@mail.com',
    passwordRepeat: '1'
};
const dataWithInvalidEmail = {
    password: '1',
    name: 'Name',
    email: 'bugiMail',
    passwordRepeat: '1'
};

describe('Sign Up', () => {
    it('Разные пароли', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signup')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(dataWithBadRepeat)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Пароли не совпадают');
                done();
            });
    });

    it('Строки состящие из пробелов', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signup')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(dataBadSpaces)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('message').not.eql('Пользователь с таким email уже зарегестрирован');
                done();
            });
    });

    it('Почта, которая уже существует', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signup')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(repeatData)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Пользователь с таким email уже зарегестрирован');
                done();
            });
    });

    it('Невалидная почта', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signup')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(dataWithInvalidEmail)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.be.a('object');
                res.body.should.have.property('message').not.eql('Пользователь с таким email уже зарегестрирован');
                done();
            });
    });
});

const validData = {
    password: '1',
    email: 'bugiMail'
};
const invalidDataPass = {
    password: '2',
    email: 'bugiMail'
};
const invalidDataMail = {
    password: '1',
    email: 'bugiMail@mail.ru'
};

describe('Sign In', () => {
    it('Валидные данные', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(validData)
            .end((err, res) => {
                res.should.have.status(200);
                es.body.should.be.a('object');
                res.body.should.have.property('message').eql('OK');
                done();
            });
    });

    it('Не валидный пароль', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(invalidDataPass)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Неверный пароль');
                done();
            });
    });

    it('Не валидный email', function (done) {
        this.timeout(4000);
        chai.request(server)
            .post('/signin')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(invalidDataMail)
            .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Юзера с данным email не существует');
                done();
            });
    });
});
