import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, InputContent } from './styles';
import { Control, Controller } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { TextRegularXS } from '../Text';

interface InputProps extends TextInputProps {
    control: Control;
    name: string;
    error?: string;
}

export const Input = ({ control, name, error, ...rest }: InputProps) => {

    const theme = useTheme();

    return (
        <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
                <Container>
                    <InputContent
                        onChangeText={onChange}
                        value={value}
                        placeholderTextColor={theme.colors.text.light}
                        {...rest}
                    />
                    {!!error && <TextRegularXS color='error'>{error}</TextRegularXS>}
                </Container>
            )}
            name={name}
        />
    );
}