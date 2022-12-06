import { useRouter } from 'next/router';
import React from 'react';
import Companyprofile from '../../components/common/Companyprofile/Companyprofile';

const Slug = () => {
  const router = useRouter();
  console.log(router.query.slug);
  const companynumber = router.query.slug;

  return (
    <div>
      <Companyprofile />
    </div>
  );
};

export default Slug;
