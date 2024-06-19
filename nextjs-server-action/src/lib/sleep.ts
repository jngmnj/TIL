// 비동기요청을 할때 지연이 되게 함
export default function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms))
}