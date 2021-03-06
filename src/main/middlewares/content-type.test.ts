import app from '@/main/config/app'
import request from 'supertest'

describe('Content Type Middleware', () => {
  it('Should return default content type as json', async () => {
    app.post('/test_content_type_json', (req, res) => {
      res.send('')
    })

    await request(app)
      .post('/test_content_type_json')
      .expect('content-type', /json/)
  })

  it('Should return xml content type when forced', async () => {
    app.post('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await request(app)
      .post('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})
