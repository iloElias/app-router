"use client";
import { Layout } from "@/components/layout";
import { Main } from "@/components/main";
import { Section } from "@/components/section";
import { useApp } from "@/contexts/app-context";

export default function Home() {
  const { headerVisible } = useApp();

  return (
    <Layout>
      <Main>
        <Section>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
          <div>
            {headerVisible ? (
              <h1 className="font-bold text-2xl">Header is visible</h1>
            ) : (
              <h1 className="font-bold text-2xl">Header is hidden</h1>
            )}
          </div>
        </Section>
      </Main>
    </Layout>
  );
}
