import React from 'react'; 
import { HighlightCard } from '../../components/HighligthCard';
import { Container, Header, UserInfo, Photo, User, UserGreeting, UserName, UserWrapper, Icon, HighlightCards } from './styles'; 


export function Dashboard() {

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
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    )
}