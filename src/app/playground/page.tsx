"use client";
import { Button } from "@/components/button";
import { Form } from "@/components/form/form";
import { FormBody } from "@/components/form/form-body";
import { FormFooter } from "@/components/form/form-footer";
import { FormGroup } from "@/components/form/form-group";
import { FormHeader } from "@/components/form/form-header";
import { Autocomplete } from "@/components/input/autocomplete";
import { DatePicker } from "@/components/input/date-picker";
import { Input } from "@/components/input/input";
import { NumberInput } from "@/components/input/number-input";
import { Select } from "@/components/input/select";
import { Textarea } from "@/components/input/textarea";
import { Main } from "@/components/main";
import { Section } from "@/components/section";
import { SubmitFormButton } from "@/components/ux/submit-form-button";
import { useRouter } from "@/hooks/use-router";

const options = [
  { value: "option1", label: "Opção 1", description: "Descrição da Opção 1" },
  { value: "option2", label: "Opção 2", description: "Descrição da Opção 2" },
  { value: "option3", label: "Opção 3", description: "Descrição da Opção 3" },
];

export default function Playground() {
  const router = useRouter();

  return (
    <>
      <Main>
        <Section>
          <Form
            className="w-full"
            initialData={router.query}
            onSubmit={(data) => {
              router.push({
                pathname: "/playground",
                query: data,
              });
            }}
          >
            <FormBody>
              <FormHeader>
                Isso é um formulário de exemplo para pesquisa
              </FormHeader>
              <FormGroup label="Dados de formulário">
                <Input
                  name="text"
                  label="text"
                  placeholder="Digite algo"
                />
                <NumberInput
                  name="number"
                  label="number"
                  placeholder="Digite um número"
                  step={1}
                />
                <NumberInput
                  name="decimal"
                  label="decimal"
                  placeholder="Digite um número decimal"
                  step={0.01}
                />
                <Select
                  name="select"
                  label="select"
                  placeholder="Selecione uma opção"
                  options={options}
                />
                <Select
                  name="select_multiple"
                  label="select_multiple"
                  placeholder="Selecione uma opção (múltipla)"
                  options={options}
                  multiple
                />
                <Autocomplete
                  name="autocomplete"
                  label="autocomplete"
                  placeholder="Digite para pesquisar"
                  options={options}
                />
                <DatePicker name="date" label="date" />
                <Textarea
                  name="textarea"
                  label="textarea"
                  placeholder="Digite algo aqui"
                />
              </FormGroup>
              <FormFooter>
                <SubmitFormButton confirmAction={false}>
                  Pesquisar
                </SubmitFormButton>
              </FormFooter>
            </FormBody>
          </Form>
          <Form
            className="w-full"
            initialData={{
              test_input: "teste",
              test_number: 15,
              test_decimal: 12.6,
              test_select: "option1",
              test_select_multiple: ["option1", "option2"],
              test_autocomplete: "option1",
              test_date: "2025-05-21",
            }}
          >
            <FormBody>
              <FormHeader>
                <div className="flex flex-row justify-between items-center w-full">
                  <h1 className="font-semibold text-gray-700 dark:text-gray-200 text-2xl">
                    Isso é um formulário de exemplo
                  </h1>
                </div>
              </FormHeader>
              <FormGroup label="Dados de formulário">
                <Input
                  name="test_input"
                  label="Campo de Texto"
                  placeholder="Digite algo"
                />
                <NumberInput
                  name="test_number"
                  label="Campo Numérico"
                  placeholder="Digite um número"
                  step={1}
                />
                <NumberInput
                  name="test_decimal"
                  label="Campo Decimal"
                  placeholder="Digite um número decimal"
                  step={0.01}
                />
                <Select
                  name="test_select"
                  label="Selecione uma opção"
                  placeholder="Selecione uma opção"
                  options={options}
                />
                <Select
                  name="test_select_multiple"
                  label="Selecione uma opção (múltipla)"
                  placeholder="Selecione uma opção (múltipla)"
                  options={options}
                  multiple
                />
                <Autocomplete
                  name="test_autocomplete"
                  label="Autocomplete"
                  placeholder="Digite para pesquisar"
                  options={options}
                />
                <DatePicker name="test_date" label="Selecione uma data" />
                <Textarea
                  name="test_textarea"
                  label="Textarea"
                  placeholder="Digite algo aqui"
                />
              </FormGroup>
              <FormFooter>
                <Button
                  className="justify-self-end px-16"
                  color="primary"
                  type="submit"
                  confirmAction
                  confirmActionInfo={{
                    actionConfirmButtonColor: "primary",
                  }}
                >
                  Continuar
                </Button>
              </FormFooter>
            </FormBody>
          </Form>
        </Section>
      </Main>
    </>
  );
}
