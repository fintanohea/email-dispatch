const request = require('supertest')
const app = require('../app')

describe('Post Endpoints', () => {
  it('should send email', async () => {
    const res = await request(app)
      .post('/api/send')
      .send({
        recipients: 'testfrom@gmail.com',
        subject: 'Test Subject',
        content: 'Test content',
        html: 'Test content'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual({ confirmation: 'success', message: 'Emails Sent!' });
  })

  it('should return recipients missing error', async () => {
    const res = await request(app)
      .post('/api/send')
      .send({
        recipients: '',
        subject: 'Test Subject',
        content: 'Test content',
        html: 'Test content'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: '',
          msg: 'No recipients provided',
          param: 'recipients',
          location: 'body'
        }
      ]
    });
  })

  it('should return invalid recipients email error', async () => {
    const res = await request(app)
      .post('/api/send')
      .send({
        value: 'test',
          msg: 'Invalid email provided: test',
          param: 'recipients',
          location: 'body'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: '',
          msg: 'No recipients provided',
          param: 'recipients',
          location: 'body'
        }
      ]
    });
  })

  it('should return subject missing error', async () => {
    const res = await request(app)
      .post('/api/send')
      .send({
        recipients: 'testfrom@gmail.com',
        subject: '',
        content: 'Test content',
        html: 'Test content'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: '',
          msg: 'No subject provided',
          param: 'subject',
          location: 'body'
        }
      ]
    });
  })

  it('should return content missing error', async () => {
    const res = await request(app)
      .post('/api/send')
      .send({
        recipients: 'testfrom@gmail.com',
        subject: 'Test Subject',
        content: '',
        html: 'Test content'
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: '',
          msg: 'No content provided',
          param: 'content',
          location: 'body'
        }
      ]
    });
  })

  it('should return html missing error', async () => {
    const res = await request(app)
      .post('/api/send')
      .send({
        recipients: 'testfrom@gmail.com',
        subject: 'Test Subject',
        content: 'Test content',
        html: ''
      })
    expect(res.statusCode).toEqual(422)
    expect(res.body).toEqual({
      errors: [
        {
          value: '',
          msg: 'No html provided',
          param: 'html',
          location: 'body'
        }
      ]
    });
  })

  
})