import React from 'react';
import { TextRegularXS, TextBoldXXS } from '../Text';
import { TouchableBox } from '../TouchableBox';
import { Container } from './styles';

interface NoResultProps {
    message: string;
    action(): void;
    actionTitle: string;
}

export const NoResult = ({ message, action, actionTitle }: NoResultProps) => {
    return (
        <Container>
            <TextRegularXS>{message}</TextRegularXS>
            <TouchableBox onPress={action}>
                <TextBoldXXS color='primary'>{actionTitle}</TextBoldXXS>
            </TouchableBox>
        </Container>
    )
}