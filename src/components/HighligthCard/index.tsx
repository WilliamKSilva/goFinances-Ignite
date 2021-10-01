import React from 'react'; 
import { Container,
    Header, 
    Title, 
    Icon, 
    Footer, 
    Amount, 
    LastTransaction,

} from './styles'; 

export function HighlightCard() {
    return(
        <Container>
            <Header>
                <Title>Entrada</Title>
                <Icon name="arrow-up-circle" /> 
            </Header>
                
                <Footer>
                    <Amount>21000</Amount>
                    <LastTransaction>R$50000,00</LastTransaction>
                </Footer>
        </Container>
    )
}