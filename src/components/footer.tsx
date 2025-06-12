"use client";
import { Footer as FooterComponent } from "@/components/ui/footer";
import FooterItem from "./footer-item";
import Icon from "./icon";
import { AddSquare, HomeAngle, User } from "@solar-icons/react";

export const Footer: React.FC = () => {
  return (
    <FooterComponent>
      <FooterItem label="Home" href="/">
        {({ active }) => (
          <Icon showAlt={active} size={32}>
            <HomeAngle />
            <HomeAngle weight="Bold" />
          </Icon>
        )}
      </FooterItem>
      <FooterItem label="Post" href="/post">
        {({ active }) => (
          <Icon showAlt={active} size={32}>
            <AddSquare />
            <AddSquare weight="Bold" />
          </Icon>
        )}
      </FooterItem>
      <FooterItem label="User" href={`/user/`}>
        {({ active }) => (
          <Icon showAlt={active} size={32}>
            <User />
            <User weight="Bold" />
          </Icon>
        )}
      </FooterItem>
    </FooterComponent>
  );
};
