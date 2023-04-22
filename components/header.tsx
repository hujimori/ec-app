import { UseAuthContext } from '@/contexts/AuthContext';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Header() {
  const authContext = UseAuthContext();
  console.log(authContext);
  const isLogin = !!authContext.user;

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const router = useRouter();
  // サインアップページへ遷移する
  const handleSignUpPageNavigation = () => {
    router.push('/signup');
  };

  // サインインページへ遷移する
  const handleSignInPageNavigation = () => {
    router.push('/signin');
  };

  // サインアウトページへ遷移する
  const handleSignOutPageNavigation = () => {
    router.push('/signout');
  };

  return (
    <>
      <Box as="section" pb={{ base: '12', md: '24' }}>
        <Box as="nav" bg="bg-surface" boxShadow="sm">
          <Container py={{ base: '4', lg: '5' }}>
            <HStack spacing="15" justify="space-between">
              {isDesktop ? (
                <Flex justify="space-between" flex="1">
                  <ButtonGroup variant="link" spacing="4">
                    {['Product', 'Pricing', 'Support'].map((item) => (
                      <Button key={item}>{item}</Button>
                    ))}
                  </ButtonGroup>

                  <HStack spacing="3">
                    <Box>{isLogin ? <Text>ログイン中</Text> : <Text>ログアウト中</Text>}</Box>
                  </HStack>
                  {isLogin ? (
                    <HStack spacing="3">
                      <Button variant="ghost" onClick={handleSignOutPageNavigation}>
                        Sign out
                      </Button>
                    </HStack>
                  ) : (
                    <HStack spacing="3">
                      <Button variant="ghost" onClick={handleSignInPageNavigation}>
                        Sign in
                      </Button>
                      <Button variant="primary" onClick={handleSignUpPageNavigation}>
                        Sign up
                      </Button>
                    </HStack>
                  )}
                </Flex>
              ) : (
                <IconButton variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" />
              )}
            </HStack>
          </Container>
        </Box>
      </Box>
    </>
  );
}
