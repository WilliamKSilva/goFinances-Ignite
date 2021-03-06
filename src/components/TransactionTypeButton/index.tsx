import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title, Icon } from './styles'


const icons = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

interface Props extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down';
    isActive: boolean;
}

export function TransactionTypeButton({title, type, isActive, ...rest} : Props) {
    return (
        <Container 
        isActive={isActive}
        {...rest}
        type={type}
        >
            <Icon 
            type={type}
            name={icons[type]}/>
            <Title>
                {title}
            </Title>
        </Container>
    )
}
