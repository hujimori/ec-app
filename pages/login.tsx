import { FormEvent, useState } from 'react';
import { signIn } from '../firebaseClient';
import { Box, Button, FormControl, FormLabel, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import '../firebaseClient';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      toast({
        title: 'ログイン成功',
        description: 'ログインに成功しました。',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'ログイン失敗',
        description: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" minH="100vh" display="flex" justifyContent="center" alignItems="center">
      <VStack as="form" onSubmit={handleLogin} spacing={4}>
        <Heading>ログイン</Heading>
        <FormControl id="email" isRequired>
          <FormLabel>メールアドレス</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="メールアドレスを入力"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>パスワード</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" w="100%">
          ログイン
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
