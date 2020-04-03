interface IMeetupProps {
  title: string;
  description: string;
  dateStart: number;
  dateEnd: number;
  limit: number;
  details: Array<string>;
}

export default IMeetupProps;
