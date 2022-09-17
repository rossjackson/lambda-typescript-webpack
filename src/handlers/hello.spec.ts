import { handler } from './hello'

let spy: jest.SpyInstance

afterEach(() => {
    jest.resetAllMocks()
})

describe('hello handler', () => {
    it('should say hello', async () => {
        const result = await handler(null)
        expect(result).toMatchSnapshot()
    })
})
