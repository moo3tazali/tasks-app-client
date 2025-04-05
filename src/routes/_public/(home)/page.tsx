import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/(home)/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-3 md:p-5 mt-40 space-y-3'>
      <h1 className='text-center font-medium text-[5vw] md:text-[3.5vw] leading-tight'>
        Seamless Task Management for
        <br />
        Teams and Individuals
      </h1>

      <p className='text-center text-xs md:text-base'>
        In today's fast-paced world, staying organized and
        on track can be challenging.
        <br />
        whether you're working alone or as part of a team.
      </p>
    </div>
  );
}
