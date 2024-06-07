import React, { useState } from "react";
import { Container, VStack, Text, Button, Input, HStack, Box, Image, IconButton, useToast } from "@chakra-ui/react";
import { FaShoppingCart, FaTrash, FaCreditCard } from "react-icons/fa";

const books = [
  { id: 1, title: "Book One", price: 10, image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjBvbmV8ZW58MHx8fHwxNzE3NzU0MDc2fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 2, title: "Book Two", price: 15, image: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjB0d298ZW58MHx8fHwxNzE3NzU0MDc2fDA&ixlib=rb-4.0.3&q=80&w=1080" },
  { id: 3, title: "Book Three", price: 20, image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGJvb2slMjB0aHJlZXxlbnwwfHx8fDE3MTc3NTQwNzd8MA&ixlib=rb-4.0.3&q=80&w=1080" },
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      toast({ title: "Logged in successfully", status: "success", duration: 2000, isClosable: true });
    } else {
      toast({ title: "Invalid credentials", status: "error", duration: 2000, isClosable: true });
    }
  };

  const addToCart = (book) => {
    setCart([...cart, book]);
    toast({ title: `${book.title} added to cart`, status: "success", duration: 2000, isClosable: true });
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter((book) => book.id !== bookId));
    toast({ title: `Book removed from cart`, status: "info", duration: 2000, isClosable: true });
  };

  const handlePayment = () => {
    toast({ title: "Payment successful", status: "success", duration: 2000, isClosable: true });
    setCart([]);
  };

  if (!isLoggedIn) {
    return (
      <Container centerContent maxW="container.sm" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Login</Text>
          <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl">Books for 7-Year-Old Kids</Text>
        <HStack spacing={4}>
          {books.map((book) => (
            <Box key={book.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
              <Image src={book.image} alt={book.title} boxSize="150px" objectFit="cover" />
              <Text mt={2} fontSize="xl">
                {book.title}
              </Text>
              <Text>${book.price}</Text>
              <Button leftIcon={<FaShoppingCart />} onClick={() => addToCart(book)}>
                Add to Cart
              </Button>
            </Box>
          ))}
        </HStack>
        <Text fontSize="2xl">Shopping Cart</Text>
        {cart.length === 0 ? (
          <Text>No items in cart</Text>
        ) : (
          <VStack spacing={4} w="100%">
            {cart.map((book) => (
              <HStack key={book.id} w="100%" justifyContent="space-between">
                <Text>{book.title}</Text>
                <Text>${book.price}</Text>
                <IconButton aria-label="Remove" icon={<FaTrash />} onClick={() => removeFromCart(book.id)} />
              </HStack>
            ))}
            <Button leftIcon={<FaCreditCard />} onClick={handlePayment}>
              Pay Now
            </Button>
          </VStack>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
