import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';


dayjs.extend(relativeTime);
dayjs.locale('ko');

export function fromNow(time: string | Date) {
    return dayjs(time).fromNow()
}