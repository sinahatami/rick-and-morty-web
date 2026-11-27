import { NotFoundState } from '~/components/feedback/NotFoundState';

export default function NotFound() {
  return (
    <NotFoundState
      title="Lost in the multiverse"
      message="The page you are looking for does not exist in this dimension."
    />
  );
}
