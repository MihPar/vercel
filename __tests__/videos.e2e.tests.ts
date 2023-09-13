import request from 'supertest'
import {app} from '../src/index'
import {HTTP_STATUS} from '../src/utits'

describe('/videos', function() {

	it('Videos was been deleted', async function() {
		await request(app).delete('/videos').expect(HTTP_STATUS.NO_CONTENT_204)	
		await request(app).get('/videos').expect(HTTP_STATUS.NOT_FOUND_404)
	})
})