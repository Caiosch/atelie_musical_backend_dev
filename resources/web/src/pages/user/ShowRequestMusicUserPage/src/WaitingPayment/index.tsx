import ButtonCTA from "@/components/layout/shared/ButtonCTA";
import RequestMusicPriceLg from "@/components/modules/request/RequestMusicPriceLg";
import { Col, Row } from "@/components/shared";
import { ApiApp } from "@/services/api/api.app";
import { apiClient } from "@/services/clients/api";
import { Heading, SimpleGrid, Text, useBoolean } from "@chakra-ui/react";
import React from "react";
import { BsPaypal } from "react-icons/bs";
import PaypalPayment from "./src/PaypalPayment";

interface WaitingPaymentProps {
  requestMusic: ApiApp.Entities.RequestMusic;
  onPay?: () => void;
}

const WaitingPayment: React.FC<WaitingPaymentProps> = ({
  requestMusic,
  onPay,
}) => {
  const [isLoadingPaypal, loadingPaypal] = useBoolean();
  const [isLoadingPagseguro, loadingPagSeguro] = useBoolean();

  const submitPaypal = async () => {
    loadingPaypal.on();
    return apiClient
      .registerMusicRequestOrder(requestMusic.id, "paypal")
      .then((res) => {
        if (!res.checkout_url) {
          return;
        }

        // window.open(res.checkout_url, "_blank");
        window.location.href = res.checkout_url;
      })
      .finally(() => {
        loadingPaypal.off();
      });
  };

  return (
    <Col gap={4}>
      <SimpleGrid gap={12} columns={[1, 1, 2, 2, 2, 2]} alignItems={"center"}>
        <Col>
          <RequestMusicPriceLg requestMusic={requestMusic} />
        </Col>
        <Col>
          <Heading
            size={"md"}
            textTransform={"uppercase"}
            color={"primary.500"}
          >
            Validação de Pagamento
          </Heading>
          <Text mt={2} mb={4}>
            Se você já efetuou o pagamento, estamos validando, por favor
            aguarde. Se o pagamento ainda não foi concluído, siga para o botão
            de pagamento:
          </Text>
          <PaypalPayment
            price={requestMusic.price_total}
            onPaymentSuccess={async ({ data: orderData }) => {
              await apiClient
                .sendPaypalPayment(requestMusic.id, orderData)
                .then(onPay);
            }}
          />
          {/* <SimpleGrid
            alignItems={"center"}
            columns={[1, 1, 1, 1, 2, 2]}
            gap={4}
          >
            <ButtonCTA
              bg={"#0079c1"}
              color={"primary.50"}
              leftIcon={<BsPaypal size={32} />}
              isLoading={isLoadingPaypal}
              onClick={submitPaypal}
            >
              <Col pl={2} alignItems={"start"}>
                <Text as={"span"}>Realizar Pagamento</Text>
                <Text
                  as={"span"}
                  fontWeight={"light"}
                  fontFamily={"heading"}
                  fontSize={"8px"}
                  opacity={0.8}
                >
                  PayPal
                </Text>
              </Col>
            </ButtonCTA>
            <ButtonCTA
              bg={"orange.400"}
              color={"primary.50"}
              leftIcon={<BsPaypal size={32} />}
              isDisabled
            >
              <Col pl={2} alignItems={"start"}>
                <Text as={"span"}>Realizar Pagamento</Text>
                <Text
                  as={"span"}
                  fontWeight={"light"}
                  fontFamily={"heading"}
                  fontSize={"8px"}
                  opacity={0.8}
                >
                  PagSeguro
                </Text>
              </Col>
            </ButtonCTA>
          </SimpleGrid> */}
        </Col>
      </SimpleGrid>
    </Col>
  );
};

export default WaitingPayment;
