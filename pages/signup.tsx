import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, ActionCodeSettings } from 'firebase/auth';
import { Box, Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import '../lib/firebase/firebaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signUp = async (e: FormEvent) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const actionCodeSettings: ActionCodeSettings = {
        url: 'http://localhost:3001/',
        handleCodeInApp: true,
      };
      await sendEmailVerification(userCredential.user, actionCodeSettings);
      // 登録後、ホームページにリダイレクト
      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack as="form" onSubmit={signUp} spacing={4}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Sign Up
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUp;
