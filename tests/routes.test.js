const request = require('supertest')
const app = require('../app')
const constants = require('../constants/constants')

describe('Post Endpoints', () => {
  // it('should send email', async () => {
  //   const res = await request(app)
  //     .post(constants.API_SEND_ROUTE)
  //     .send({
  //       recipients: constants.VALID_EMAIL_VALUE,
  //       subject: constants.VALID_STRING_VALUE,
  //       content: constants.VALID_STRING_VALUE,
  //       html: constants.VALID_STRING_VALUE
  //     })
  //   expect(res.statusCode).toEqual(200)
  //   expect(res.body).toEqual({ confirmation: constants.SUCCESS, message: constants.EMAILS_SENT_MESSAGE});
  // })

  it('should return recipients missing error', async () => {
    const res = await request(app)
      .post(constants.API_SEND_ROUTE)
      .send({
        recipients: constants.EMPTY_STRING_VALUE,
        subject: constants.VALID_STRING_VALUE,
        content: constants.VALID_STRING_VALUE,
        html: constants.VALID_STRING_VALUE
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: constants.EMPTY_STRING_VALUE,
          msg: constants.NO_RECIPIENTS_MESSAGE,
          param: constants.RECIPIENTS_PARAM,
          location: 'body'
        }
      ]
    });
  })

  it('should return invalid recipients email error', async () => {
    const res = await request(app)
      .post(constants.API_SEND_ROUTE)
      .send({
        recipients: constants.INVALID_EMAIL_VALUE,
        subject: constants.VALID_STRING_VALUE,
        content: constants.VALID_STRING_VALUE,
        html: constants.VALID_STRING_VALUE
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: constants.INVALID_EMAIL_VALUE,
          msg: constants.INVALID_EMAIL_MESSAGE + constants.INVALID_EMAIL_VALUE,
          param: constants.RECIPIENTS_PARAM,
          location: 'body'
        }
      ]
    });
  })

  it('should return subject missing error', async () => {
    const res = await request(app)
      .post(constants.API_SEND_ROUTE)
      .send({
        recipients: constants.VALID_EMAIL_VALUE,
        subject: constants.EMPTY_STRING_VALUE,
        content: constants.VALID_STRING_VALUE,
        html: constants.VALID_STRING_VALUE
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: constants.EMPTY_STRING_VALUE,
          msg: constants.NO_SUBJECT_MESSAGE,
          param: constants.SUBJECT_PARAM,
          location: 'body'
        }
      ]
    });
  })

  it('should return content missing error', async () => {
    const res = await request(app)
      .post(constants.API_SEND_ROUTE)
      .send({
        recipients: constants.VALID_EMAIL_VALUE,
        subject: constants.VALID_STRING_VALUE,
        content: constants.EMPTY_STRING_VALUE,
        html: constants.VALID_STRING_VALUE
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: constants.EMPTY_STRING_VALUE,
          msg: constants.NO_CONTENT_MESSAGE,
          param: constants.CONTENT_PARAM,
          location: 'body'
        }
      ]
    });
  })

  it('should return html missing error', async () => {
    const res = await request(app)
      .post(constants.API_SEND_ROUTE)
      .send({
        recipients: constants.VALID_EMAIL_VALUE,
        subject: constants.VALID_STRING_VALUE,
        content: constants.VALID_STRING_VALUE,
        html: constants.EMPTY_STRING_VALUE
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: constants.EMPTY_STRING_VALUE,
          msg: constants.NO_HTML_MESSAGE,
          param: constants.HTML_PARAM,
          location: 'body'
        }
      ]
    });
  })
})