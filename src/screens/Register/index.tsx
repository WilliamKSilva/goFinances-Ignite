import React, { useState } from 'react';
import {Container, Header, Title, Form, Fields, TransactionTypes} from './styles';
import { InputForm } from '../../components/Forms/InputForm';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import { Button } from '../../components/Forms/Button';

import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';

import { CategorySelect } from '../CategorySelect';

interface FormData {
    name: string;
    amount: string;
}

type NavigationProps = {
    navigate:(screen:string) => void;
}

const schema = Yup.object().shape({
    name: Yup
    .string()
    .required('Nome é obrigatório'),
    amount: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Você precisa inserir um valor')
})

export function Register() {
    
    const dataKey = '@gofinances:transactions';
    
    const [category, setCategory] = useState({
        key: 'category', 
        name: 'Categoria', 
    });

    const navigation = useNavigation<NavigationProps>();

    const {
        control, 
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    const [transactionType, setTransactionType] = useState('');
    const [categoryModalOpen, setcategoryModalOpen] = useState(false);
    
    function handleTransactionTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleCloseSelectCategoryModal() {
        setcategoryModalOpen(false);
    }

    function handleOpenSelectCategoryModal() {
        setcategoryModalOpen(true);
    }

    async function handleRegister(form: FormData) {
        if(!transactionType)
          return Alert.alert("Selecione o tipo da transação");

        if(category.key === 'category')
          return Alert.alert("Selecione a categoria");

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType, 
            category: category.key, 
            date: new Date() 
        }
        
        try {

          const data = await AsyncStorage.getItem(dataKey);
          const currentData = data ? JSON.parse(data) : [];

          const dataFormatted = [
              ...currentData, 
              newTransaction

          ];

          await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

          reset();
          setTransactionType('');
          setCategory({
              key: 'category', 
              name: 'Categoria'
          });

          navigation.navigate('Listagem');

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
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
                        error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton 
                                type="up"
                                title="Income"
                                onPress={() => handleTransactionTypeSelect('positive')}
                                isActive={transactionType === "positive"}
                            />   
                            <TransactionTypeButton 
                                type="down"
                                title="Outcome"
                                onPress={() => handleTransactionTypeSelect('negative')}
                                isActive={transactionType === "negative"}
                            />               
                        </TransactionTypes>
                        <CategorySelectButton title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                        />
                    </Fields>

                    <Button 
                    title="Enviar"
                    onPress={handleSubmit(handleRegister)}
                    />
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