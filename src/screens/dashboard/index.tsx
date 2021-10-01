import React from 'react'; 


import { HighlightCard } from '../../components/HighligthCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import { Container, 
    Header, 
    UserInfo, 
    Photo,
    User, 
    UserGreeting, 
    UserName, 
    UserWrapper, 
    Icon, 
    HighlightCards, 
    Transactions, 
    Title, 
    TransactionList } from './styles'; 

export interface DataListProps extends TransactionCardProps {
    id: string,
}

export function Dashboard() {
    const data: DataListProps[] = [
        {
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site", 
        amount: "R$ 12.000,00", 
        category: {
            name: 'Vendas',
            icon: 'dollar-sign', 
        },
        date: "13/08/2002"
    }, 
    {        
        id: '2',
        type: 'negative',
        title: "Hamburgueria", 
        amount: "R$ 30.000,00", 
        category: {
            name: 'Alimentação',
            icon: 'coffee', 
        },
        date: "13/08/2002",
    },
    
    {        
        id: '3',
        type: 'negative',
        title: "Apartamento", 
        amount: "R$ 200.000,000", 
        category: {
            name: 'Alimentação',
            icon: 'shopping-bag', 
         },
        date: "13/08/2002"
    }
];



    return(
        <Container>
            <Header> 
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: "https://avatars.githubusercontent.com/u/75429175?v=4"}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>William</UserName>
                        </User>   
                    </UserInfo>
                    <Icon name="power"/>
                </UserWrapper> 
            </Header>

            <HighlightCards>
                <HighlightCard type="up" title="Entradas" amount="50000" lastTransaction="Dia 30"/>
                <HighlightCard type="down" title="Saídas" amount="50000" lastTransaction="Dia 30"/>
                <HighlightCard type="total" title="Total" amount="50000" lastTransaction="Dia 30"/>
            </HighlightCards>

            <Transactions>
                <Title>
                    Listagem
                </Title>

                <TransactionList 
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                   
                />
            </Transactions>
        </Container>
    )
}