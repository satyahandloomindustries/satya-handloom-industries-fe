import Filter from '@/components/Filter';
import MultiRenderer from '@/components/MultiRenderer';
import ShopHeader from '@/components/ShopHeader';
import TextGray from '@/components/TextGray';
import { profile_categories } from '@/constants';
import ProductAdmin from '@/app/profile/components/ProductAdmin';

const Profile = () => {
  return (
    <div>
      <ShopHeader />
      <main className="p-16 grid grid-cols-[0.25fr_1.75fr] gap-10">
        <div>
          <Filter title="Profile">
            <MultiRenderer
              Component={({ label }) => (
                <TextGray text={label} className="mt-3 cursor-pointer" />
              )}
              rendererSet={profile_categories}
            />
          </Filter>
        </div>
        <ProductAdmin />
      </main>
    </div>
  );
};

export default Profile;
