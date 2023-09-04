// import { API_URL } from "@/utils/api";
import { Input, Button, Card, Title, Stack } from "@mantine/core";
import { useState, useEffect } from "react";
export default function Form() {
  const [form, setForm] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    amount: "",
    time: "",
  });

  function onFormChange(event: React.FormEvent<EventTarget>) {
    const target = event.target as HTMLInputElement;
    setForm((state) => {
      return {
        ...state,
        [target.name]: target.value,
      };
    });
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(form.email)) {
      alert("email badly formated!");
      return;
    }

    var body = { ...form };
    // delete body.confirmpassword;

    var response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        amount: form.amount,
      }),
    });

    var json = await response.json();
    console.log(json);
  }

  return (
    <Card withBorder shadow="xs" p="xl" bg="cyan.2">
      <Title order={1} color="blue">
        Donate
      </Title>

      <form onSubmit={onSubmit}>
        <Stack spacing={"xs"}>
          <Input.Wrapper>
            <Input.Label>First Name</Input.Label>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={onFormChange}
            />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Last Name</Input.Label>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={onFormChange}
            />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Email</Input.Label>
            <Input name="email" value={form.email} onChange={onFormChange} />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>

          <Input.Wrapper>
            <Input.Label>Donation Amount</Input.Label>
            <Input name="amount" value={form.amount} onChange={onFormChange} />
            <Input.Error>{/* Error goes here */}</Input.Error>
          </Input.Wrapper>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Card>
  );
}
