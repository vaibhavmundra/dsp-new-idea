import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import React from "react";

// Base URL setup for images or other assets
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://learn.designopolis.co.in";

// Default props for the component
const PropDefaults = {
  steps: [
    {
      id: 1,
      Description: (
        <li className="mb-20" key={1}>
          <strong>Create an account.</strong> Create an account on the{" "}
          <Link href="https://learn.designopolis.co.in/login">
            Designopolis website
          </Link>{" "}
          with this email id.
        </li>
      ),
    },
    {
      id: 2,
      Description: (
        <li className="mb-20" key={2}>
          <strong>Access your course</strong> Purchased courses associated with
          this email id will show up in your{" "}
          <Link href="https://learn.designopolis.co.in/dashboard">
            Dashboard.
          </Link>
        </li>
      ),
    },
    {
      id: 3,
      Description: (
        <li className="mb-20" key={3}>
          <strong>Join a session.</strong> To get the most out of your learning
          experience, we recommend accessing the platform via a Laptop/PC.
        </li>
      ),
    },
    {
      id: 4,
      Description: (
        <li className="mb-20" key={4}>
          <strong>View the recordings.</strong> Missed a live session?
          Recordings for the same will automatically be available on the{" "}
          <Link href="https://learn.designopolis.co.in/dashboard">
            Dashboard
          </Link>{" "}
          a couple of hours after the session ends.
        </li>
      ),
    },
  ],
  links: ["Visit the forums", "Read the docs", "Contact an expert"],
};

// Email Template Component
const EmailTemplate = ({
  steps = PropDefaults.steps,
  links = PropDefaults.links,
  email,
  course,
}) => {
  return (
    <Html>
      <Head />
      <Preview>You have successfully enrolled for the course: {course}</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#6161f5",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite text-base font-sans">
          <Img
            src={`https://learn.designopolis.co.in/_next/image?url=%2Fdesignopolis-logo-lg.png&w=384&q=75`}
            alt="Designopolis Logo"
            className="mx-auto my-20"
          />
          <Container className="bg-white p-45">
            <Heading className="text-center my-0 leading-8">
              Welcome to Designopolis
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  Congratulations! You have successfully enrolled for the
                  course: {course}
                </Text>

                <Text className="text-base">Here is how to get started:</Text>
              </Row>
            </Section>

            <ul>{steps?.map(({ Description }) => Description)}</ul>

            <Section className="text-center">
              <Button
                className="bg-brand text-white rounded-full py-3 px-[18px]"
                href="https://learn.designopolis.co.in/dashboard"
              >
                Go to your dashboard
              </Button>
            </Section>
          </Container>

          <Container className="mt-20">
            <Text className="text-center text-gray-400 mb-45">
              Zima Blue Private Limited | GSTIN 19AABCZ6133H1Z5
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
