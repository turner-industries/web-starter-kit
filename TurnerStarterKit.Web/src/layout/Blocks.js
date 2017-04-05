/** @jsx createElement */
import { createElement, Component } from "react";
import { Container } from "semantic-ui-react";
import autobind from "autobind-decorator";

import api from "store/api";
import SmallScreen from "layout/SmallScreen";
import TradeNavigation from "./TradeNavigation";
import TradeRoutes from "./TradeRoutes";
import { Block, Row } from 'jsxstyle';

export const DefaultContentPage = ({children, ...props}) => (
  <Row
    flex="1 1 auto"
    paddingTop="35px"
    overflowY="scroll"
    paddingLeft="20px"
    paddingRight="20px"
    {...props}
    children={children}
  />
);

export const LeftMenuPage = ({menu, children}) => (
  <Row
    flex="1 1 auto"
    overflowY="hidden"
  >
    <Block
      paddingRight="20px"
      paddingLeft="20px"
      paddingTop="35px"
    >
      {menu}
    </Block>
    <Block
      flex={1}
      overflowY="scroll"
      paddingRight="20px"
      paddingTop="35px"
    >
      {children}
    </Block>
  </Row>
);
