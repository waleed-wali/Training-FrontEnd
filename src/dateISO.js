import dayjs from 'dayjs';

const formatToDMY = ({ isoString }) => {
  return dayjs(isoString).format('DD-MM-YYYY');
};
export { formatToDMY };
