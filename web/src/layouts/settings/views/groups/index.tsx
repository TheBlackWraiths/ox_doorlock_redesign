import { useEffect } from 'react';
import { useSetters } from '../../../../store';
import GroupFields from './components/GroupFields';
import Layout from '../../Layout';

const Groups: React.FC = () => {
  const setGroups = useSetters((setter) => setter.setGroups);

  useEffect(() => {
    return () => {
      setGroups((prevState) =>
        prevState.filter((item, index) => item.name !== '' || item.grade !== null || index === 0)
      );
    };
  }, []);

  return (
    <Layout setter={() => setGroups((prevState) => [...prevState, { name: '', grade: null }])}>
      <GroupFields />
    </Layout>
  );
};

export default Groups;
