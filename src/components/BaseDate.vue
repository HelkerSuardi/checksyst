<template>
    <q-input
        :value="getDate()"
        :label="label"
        :rules="[date => validateDate(date) || 'Data inválida']"
        :error="error"
        @clear="clearDate"
        v-bind="$attrs"
        filled
    >
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy :ref="_uid" transition-show="scale" transition-hide="scale">
                    <q-date
                        :value="getDate()"
                        :options="filter"
                        mask="DD/MM/YYYY"
                        @input="setDate"
                        v-bind="$attrs"
                    />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
import moment from 'moment';
const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            default: 'Data',
        },
        minDate: {
            default: '',
        },
        maxDate: {
            default: '',
        },
        tourExecutionDays: {
            default: ''
        },
        error: {
            default: false,
        },
    },
    data() {
        return {
            model: this.$attrs.value,
            options: this.$attrs.options,
        };
    },
    methods: {
        setDate(value) {
            const date = moment(value, 'DD/MM/YYYY').toDate();
            this.model = date;
            this.$emit('date-changed', date);
            this.$refs[this._uid].hide();
        },
        getDate() {
            const date = this.model;

            if (date) {
                return moment(date).format('DD/MM/YYYY');
            }

            return '';
        },
        clearDate() {
            this.model = null;
            this.$emit('cleared');
        },
        validateDate(date) {
            return date ? date.match(dateRegex) : true;
        },
        filter(date) {
            const dateParts = date.split('/');

            const filterDate = new Date();
            filterDate.setDate(parseInt(dateParts[2]));
            filterDate.setMonth(parseInt(dateParts[1]) - 1);
            filterDate.setFullYear(parseInt(dateParts[0]));
            filterDate.setHours(0, 0, 0, 0);

            const maxDate = this.computedMaxDate;
            const minDate = this.computedMinDate;

            if (this.tourExecutionDays.length !== 0) {
                if (maxDate && minDate) {
                    return maxDate >= filterDate && minDate <= filterDate && this.tourExecutionDays.includes(new Date(filterDate).getDay() + 1);
                }

                if (minDate) {
                    return minDate <= filterDate && this.tourExecutionDays.includes(new Date(filterDate).getDay() + 1);
                }

                if (maxDate) {
                    return filterDate <= maxDate && this.tourExecutionDays.includes(new Date(filterDate).getDay() + 1);
                }

                return this.tourExecutionDays.includes(new Date(filterDate).getDay() + 1)
            }

            if (maxDate && minDate) {
                return maxDate >= filterDate && minDate <= filterDate;
            }

            if (minDate) {
                return minDate <= filterDate;
            }

            if (maxDate) {
                return filterDate <= maxDate;
            }

            return true;
        },
    },
    computed: {
        computedMinDate() {
            if (this.minDate && this.minDate instanceof Date) {
                this.minDate.setHours(0, 0, 0, 0);

                return this.minDate;
            }

            if (
                this.minDate &&
                (this.minDate instanceof String ||
                    typeof this.minDate === 'String' ||
                    typeof this.minDate === 'string')
            ) {
                const minDate = new Date(this.minDate);
                minDate.setHours(0, 0, 0, 0);

                return minDate;
            }

            return undefined;
        },
        computedMaxDate() {
            if (this.maxDate && this.maxDate instanceof Date) {
                this.maxDate.setHours(0, 0, 0, 0);

                return this.maxDate;
            }

            if (
                this.maxDate &&
                (this.maxDate instanceof String ||
                    typeof this.maxDate === 'String' ||
                    typeof this.maxDate === 'string')
            ) {
                const maxDate = new Date(this.maxDate);
                maxDate.setHours(0, 0, 0, 0);

                return maxDate;
            }

            return undefined;
        },
    },
    watch: {
        '$attrs.value': function(value) {
            this.model = value;
        },
    },
};
</script>
