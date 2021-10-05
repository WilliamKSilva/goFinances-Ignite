import React, { useState } from 'react';
import {Container, Header, Title, Form, Fields, TransactionTypes} from './styles';
import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/InputForm';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Modal } from 'react-native';

import { CategorySelect } from '../CategorySelect';

export function Register() {
    const [category, setCategory] = useState({
        key: 'category', 
        name: 'Categoria', 
    });

    const {
        control, 
        handleSubmit,

    } = useForm();

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

    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <InputForm name="name" control={control} placeholder="Nome"/>

                    <InputForm name="amount" control={control} placeholder="Preço"/>
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

    );
}