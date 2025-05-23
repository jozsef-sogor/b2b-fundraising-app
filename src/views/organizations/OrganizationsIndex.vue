<script setup lang="ts">
import { ref, onMounted } from "vue";
import { createColumnHelper, getCoreRowModel, useVueTable } from "@tanstack/vue-table";
import { type Organization } from "@/types/entities";
import { useOrganizations } from "@/composables";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { BaseButton } from "@/components/base";

const { getAllOrganizations } = useOrganizations();
const organizations = ref<Organization[]>([]);

const columnHelper = createColumnHelper<Organization>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
];

const table = useVueTable({
  get data() {
    return organizations.value;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

onMounted(async () => {
  const fetchedOrganizations = await getAllOrganizations();
  organizations.value = fetchedOrganizations ?? [];
});
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <template v-for="header in headerGroup.headers" :key="header.id">
            <TableHead>
              <span>{{ header.column.columnDef.header }}</span>
            </TableHead>
          </template>
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
          {{ cell.getValue() }}
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <BaseButton class="mt-4" to="/organizations/create">Add organization</BaseButton>
</template>
