import React, { useState } from 'react';
import {Container, Header, Title, Form, Fields, TransactionTypes} from './styles';
import { InputForm } from '../../components/Forms/InputForm';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '../../components/Forms/Button';

import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';

import { CategorySelect } from '../CategorySelect';

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    amount: Yup.number().typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
})

export function Register() {
    const [category, setCategory] = useState({
        key: 'category', 
        name: 'Categoria', 
    });

    const {
        control, 
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setcategoryModalOpen] = useState(false);
    
    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal() {
        setcategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal() {
        setcategoryModalOpen(true);
    }

    function handleRegister(form: FormData) {
        if(!transactionType)
          return Alert.alert("Selecione o tipo da transação");

        if(category.key === 'category')
          return Alert.alert("Selecione a categoria");

        const data = {
            name: form.name,
            amount: form.amount,
            transactionType, 
            category: category.key
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm 
                        name="name" 
                        control={control} 
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        placeholder="Nome"
                        error={errors.name && errors.name.message}
                        />

                        <InputForm 
                        name="amount" 
                        control={control} 
                        placeholder="Preço"
                        keyboardType="numeric"
                        error={errors.amount && errors.name.amount}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton 
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActive={transactionType === "up"}
                            />   
                            <TransactionTypeButton 
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionTypeSelect('down')}
                                isActive={transactionType === "down"}
                            />               
                        </TransactionTypes>
                        <CategorySelectButton title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button title="Enviar"/>
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>

    );
}