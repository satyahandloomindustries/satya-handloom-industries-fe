import FooterMotion from './FooterMotion';
import styles from './index.module.css';
import ShiLogo from '../ShiLogo';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import Link from 'next/link';
import { Manrope } from 'next/font/google';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const column = Manrope({
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const contactUs = [
  {
    Icon: HomeOutlinedIcon,
    label: 'Khandak Bazar, Meerut (U.P)',
  },
  {
    Icon: MailOutlinedIcon,
    label: 'satyahandloomfabrics1@gmail.com',
  },
  {
    Icon: PhoneOutlinedIcon,
    label: '(+91) 9458805785',
  },
];

const visit = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Journal', href: '/blogs' },
  { label: 'Contact', href: '/contactUs' },
];

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/108991253/admin/dashboard/',
    Icon: FaLinkedin,
  },
  { label: 'Facebook', href: '/', Icon: FaFacebook },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/satyahandloomfabrics1?rpxt=cm04cjB5czRmdmhu/',
    Icon: FaInstagram,
  },
];

const ContactUsFooter = () => {
  return (
    <FooterMotion>
      <div className="px-6 py-14 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.7fr_1fr_0.8fr]">
          <div className={styles.col}>
            <ShiLogo width={52} height={52} />
            <p className="mt-4 text-[11px] uppercase tracking-[0.32em] text-[#b8893f]">
              Satya Handloom Fabrics
            </p>
            <p className="mt-4 max-w-sm text-2xl leading-snug">
              Premium handloom, made for trade and home.
            </p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5c5146]">
              Sustainable textiles from Meerut for wholesale, hospitality, and
              made-to-order orders.
            </p>
          </div>

          <div className={`${column.className} ${styles.col}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#b8893f]">
              Visit
            </p>
            <ul className="mt-4 space-y-2">
              {visit.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className={`${styles.link} text-sm text-[#3d342b] hover:text-[#b8893f]`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={`${column.className} ${styles.col}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#b8893f]">
              Studio
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#3d342b]">
              <li>Khandak Bazar, Meerut, Uttar Pradesh</li>
              <li>
                <a
                  href="tel:+919458805785"
                  className={`${styles.link} hover:text-[#b8893f]`}
                >
                  +91 9458805785
                </a>
              </li>
              <li>
                <a
                  href="mailto:satyahandloomfabrics1@gmail.com"
                  className={`${styles.link} break-all hover:text-[#b8893f]`}
                >
                  satyahandloomfabrics1@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className={`${column.className} ${styles.col}`}>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#b8893f]">
              Follow
            </p>
            <ul className="mt-4 space-y-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <Link
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`${styles.link} inline-flex items-center gap-2 text-sm text-[#3d342b] hover:text-[#b8893f]`}
                  >
                    <Icon className="text-base" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#e4d3b4] pt-6 text-[11px] uppercase tracking-[0.22em] text-[#8a7b68] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Satya Handloom Fabrics</p>
          <p>Meerut</p>
        </div>
      </div>
    </FooterMotion>
  );
};

export default ContactUsFooter;
