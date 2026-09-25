import { Plus, Trash2, Workflow, Code2 } from "lucide-react";

function InterfaceEditor({
  interfaces,
  setInterfaces,
}) {
  const addInterface = () => {
    setInterfaces([
      ...interfaces,
      {
        name: "",
        methods: [],
      },
    ]);
  };

  const removeInterface = (index) => {
    setInterfaces(
      interfaces.filter((_, i) => i !== index)
    );
  };

  const updateName = (index, value) => {
    const updated = [...interfaces];

    updated[index].name = value;

    setInterfaces(updated);
  };

  const addMethod = (interfaceIndex) => {
    const updated = [...interfaces];

    updated[interfaceIndex].methods.push({
      name: "",
      returnType: "",
      parameters: [],
    });

    setInterfaces(updated);
  };

  const updateMethod = (
    interfaceIndex,
    methodIndex,
    key,
    value
  ) => {
    const updated = [...interfaces];

    updated[interfaceIndex].methods[methodIndex][key] =
      value;

    setInterfaces(updated);
  };

  const removeMethod = (
    interfaceIndex,
    methodIndex
  ) => {
    const updated = [...interfaces];

    updated[interfaceIndex].methods =
      updated[interfaceIndex].methods.filter(
        (_, i) => i !== methodIndex
      );

    setInterfaces(updated);
  };

  return (
    <div className="space-y-6">
      {/* EXISTING INTERFACES */}
      {interfaces.map((item, interfaceIndex) => (
        <div
          key={interfaceIndex}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* HEADER */}
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <Workflow size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Interface {interfaceIndex + 1}
                </p>

                <input
                  type="text"
                  placeholder="Interface name e.g. FeeCalculator"
                  value={item.name}
                  onChange={(e) =>
                    updateName(
                      interfaceIndex,
                      e.target.value
                    )
                  }
                  className="w-full border-0 bg-transparent p-0 text-lg font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-0"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  removeInterface(interfaceIndex)
                }
                title="Delete interface"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* BODY */}
          <div className="p-5">
            <div>
              {/* METHODS HEADER */}
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">
                    Methods
                  </h4>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Define the behavior this interface exposes.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addMethod(interfaceIndex)
                  }
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <Plus size={15} />
                  Add Method
                </button>
              </div>

              {/* EMPTY METHODS */}
              {item.methods.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center">
                  <Code2
                    size={22}
                    className="mx-auto text-slate-400"
                  />

                  <p className="mt-2 text-sm text-slate-400">
                    No methods added yet.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      addMethod(interfaceIndex)
                    }
                    className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    + Add your first method
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {item.methods.map(
                    (method, methodIndex) => (
                      <div
                        key={methodIndex}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        {/* METHOD TITLE */}
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2
                              size={15}
                              className="text-purple-500"
                            />

                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Method {methodIndex + 1}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeMethod(
                                interfaceIndex,
                                methodIndex
                              )
                            }
                            title="Delete method"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        {/* METHOD INPUTS */}
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <input
                            type="text"
                            placeholder="Method name e.g. calculateFee"
                            value={method.name}
                            onChange={(e) =>
                              updateMethod(
                                interfaceIndex,
                                methodIndex,
                                "name",
                                e.target.value
                              )
                            }
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                          <input
                            type="text"
                            placeholder="Return type e.g. double"
                            value={method.returnType}
                            onChange={(e) =>
                              updateMethod(
                                interfaceIndex,
                                methodIndex,
                                "returnType",
                                e.target.value
                              )
                            }
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ADD INTERFACE */}
      <button
        type="button"
        onClick={addInterface}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white py-5 font-semibold text-slate-500 transition hover:border-purple-400 hover:bg-purple-50/50 hover:text-purple-600"
      >
        <Plus size={19} />
        Add Interface
      </button>

      {/* EMPTY STATE */}
      {interfaces.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
            <Workflow size={24} />
          </div>

          <h3 className="mt-3 font-bold text-slate-800">
            No interfaces yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add interfaces when your design needs
            interchangeable implementations.
          </p>
        </div>
      )}
    </div>
  );
}

export default InterfaceEditor;