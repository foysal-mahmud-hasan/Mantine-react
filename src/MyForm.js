import React from 'react';
import { Button, TextInput, Group, Text, NumberInput, Container } from '@mantine/core';
import { Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Grid, FileInput, NativeSelect } from '@mantine/core';

const MyForm = () => {
    // Use the `useForm` hook to manage form state and validation
    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            age: '',
            checked: false,
            files: [],
            selectedNative: '',
        },
        validate: {
            name: (value) => (value.length > 0 ? null : 'Name is required'),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            checked: (value) => (value ? null : 'Must agree to sell privacy'),
            age: (value) => (value < 18 ? 'You must be at least 18 to register' : null),
            files: (value) => (value.length > 0 ? null : 'Please upload a file '),
            selectedNative: (value) => (value !== '' ? null : 'Please select a library'),
        },
    });

    // Handle form submission
    const handleSubmit = (values) => {
        console.log('Submitted data:', values);
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid>
                <Grid.Col span={6}>
                    <Container style={{ alignItems: 'center' }}>
                        <TextInput
                            mt={'md'}
                            label="Name"
                            placeholder="Enter your name"
                            {...form.getInputProps('name')}
                            error={form.errors.name}
                        />
                        <TextInput
                            mt={'md'}
                            label="Email"
                            placeholder="Enter your email"
                            {...form.getInputProps('email')}
                            error={form.errors.email}
                        />
                        <NumberInput
                            mt="sm"
                            label="Age"
                            placeholder="Age"
                            min={0}
                            max={99}
                            {...form.getInputProps('age')}
                            error={form.errors.age}
                        />
                        <Checkbox
                            mt={'sm'}
                            checked={form.values.checked}
                            {...form.getInputProps('checked')}
                            error={form.errors.checked}
                        />
                        <FileInput
                            mt={'sm'}
                            label={'Upload files'}
                            placeholder={'GG BOIS'}
                            accept='image/png,image/jpg'
                            onChange={(files) => {
                                // console.log('Selected files:', files); 
                                form.setFieldValue('files', files.name);
                            }}
                            error={form.errors.files}
                        />
                    </Container>

                </Grid.Col>

                <Grid.Col span={6}>
                    <Container style={{ alignItems: 'center' }}>


                        <NativeSelect
                            label={'Libraries'}
                            mt={'md'}
                            value={form.values.selectedNative || ''}
                            data={['', 'React', 'Angular', 'Svelte', 'Vue']}
                            onChange={(event) => {
                                form.setFieldValue('selectedNative', event.currentTarget.value);
                                // console.log(typeof (event.currentTarget.value));
                            }
                            }
                            error={form.errors.selectedNative}
                        />

                    </Container>

                </Grid.Col>
                <Grid.Col span={12} >
                    <Container style={{ alignItems: 'center' }}>

                        <Group mt="md" >
                            <Button type="submit">Submit</Button>
                        </Group>
                    </Container>

                </Grid.Col>
            </Grid>
            {Object.keys(form.errors).length > 0 && (
                <Text color="red">Please fix the errors before submitting.</Text>
            )}
        </form >
    );
};

export default MyForm;