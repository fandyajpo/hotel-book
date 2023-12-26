type TitleT = {
  title: string;
};

const Title = (props: TitleT) => (
  <p className="text-xl font-semibold">{props.title}</p>
);

export default Title;
