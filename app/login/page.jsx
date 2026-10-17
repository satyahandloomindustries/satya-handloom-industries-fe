import ShiLogo from '@/components/ShiLogo';
import Authenticate from './components/Authenticate';

const pillars = [
  {
    title: 'Handcrafted living',
    text: 'Bedsheets, curtains, and home textiles woven with care.',
    color: '#c29958',
  },
  {
    title: 'Hospitality standards',
    text: 'High-value fabrics made for homes, hotels, and everyday use.',
    color: '#c29958',
  },
  {
    title: 'Wholesale and custom',
    text: 'Sustainable textiles for bulk orders and made-to-order work.',
    color: '#c29958',
  },
];

const Login = () => {
  return (
    <main className="flex min-h-[calc(100vh-78px)] items-center bg-[#f7f3ec] px-4 py-8 md:px-10">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-[#fffaf3] shadow-[0_16px_40px_rgba(92,62,24,0.08)] ring-1 ring-[#eadfce] md:grid-cols-2">
        <section className="relative overflow-hidden bg-[linear-gradient(180deg,#2c261f_0%,#1a1613_100%)] px-8 py-10 text-[#f7f3ec] md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#c29958]/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <ShiLogo width={52} height={52} />
            <div className="leading-tight">
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#e8c98a]">
                Satya
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#f7f3ec]">
                Handloom Fabrics
              </p>
            </div>
          </div>

          <h1 className="relative mt-10 text-3xl leading-tight md:text-4xl">
            Premium handloom, made for trade and home.
          </h1>
          <p className="relative mt-4 text-sm leading-6 text-[#f7f3ec]/70">
            Meerut’s workshop for sustainable textiles — customizable fabrics
            for wholesale and bulk distribution.
          </p>

          <ul className="relative mt-8 space-y-4">
            {pillars.map(({ title, text, color }) => (
              <li key={title} className="flex gap-3">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <p className="text-sm font-medium">{title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-[#f7f3ec]/65">
                    {text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex items-center px-8 py-10 md:px-12">
          <Authenticate />
        </section>
      </div>
    </main>
  );
};

export default Login;
