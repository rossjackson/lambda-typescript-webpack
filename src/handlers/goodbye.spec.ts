import { handler } from './goodbye'

describe('goodbye handler', () => {
    test('it should say goodbye', async () => {
        const result = await handler(null)
        expect(result).toMatchSnapshot()
    })
})
