import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import '../lib/firebase/firebaseClient';

const SignOut = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();

    const auth = getAuth();
    signOut(auth).then(() => {
      router.push('/');
    });
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack as="form" onSubmit={handleSignOut} spacing={4}>
        <Button type="submit" colorScheme="blue">
          Sign Out
        </Button>
      </VStack>
    </Box>
  );
};

export default SignOut;
