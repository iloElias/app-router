"use client";
import { Form } from "@/components/form/form";
import { FormBody } from "@/components/form/form-body";
import { Input } from "@/components/input/input";
import { Layout } from "@/components/layout";
import { Main } from "@/components/main";
import { Section } from "@/components/section";
import { SubmitFormButton } from "@/components/ux/submit-form-button";
import { useAuth } from "@/contexts/auth-provider";

export default function Playground() {
  const { user, setUser } = useAuth();

  return (
    <Layout>
      <Main>
        <Section>
          <Form
            className="flex flex-col justify-center items-center w-96 h-full"
            initialData={user}
            onSubmit={(data) => {
              setUser({
                id: 1,
                uuid: "00000000-0000-0000-0000-000000000000",
                name: data.name,
                surname: data.surname,
                email: data.email,
                picture: "/image.png",
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              });
            }}
          >
            <FormBody>
              <Input
                name="name"
                label="Nome"
                type="name"
                placeholder="Digite algo"
              />
              <Input
                name="surname"
                label="Sobrenome"
                type="name"
                placeholder="Digite algo"
              />
              <Input
                name="email"
                label="Email"
                type="email"
                placeholder="Digite algo"
              />
              <Input
                name="password"
                label="Password"
                type="password"
                placeholder="Digite algo"
                taggableVisibility
              />
              <SubmitFormButton confirmAction={false}>Login</SubmitFormButton>
            </FormBody>
          </Form>
        </Section>
      </Main>
    </Layout>
  );
}
