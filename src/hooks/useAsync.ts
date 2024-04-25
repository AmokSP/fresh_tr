import { useCallback, useEffect, useState } from 'react';

/**
 * 一个异步操作的常见状态
 * idle: 空闲状态，该异步操作未曾发起
 * pending: 异步操作执行中
 * success: 异步操作成功
 * error: 异步操作失败
 */
type UseAsyncStatus = 'idle' | 'pending' | 'success' | 'error';

/**
 * 对 useAsync 的主要参数 asyncCallback 进行约束
 * 必须为一个返回Promise的函数
 */
type PromiseFunc<T> = (...args: any[]) => Promise<T>;

/**
 * 异步执行函数的钩子
 *
 * 场景：
 * 页面加载数据，通常我们会用
 * 一个loading state来保存加载状态
 * 一个data state 来保存返回数据
 * 一个fetch 函数来执行异步操作，并在其中设置loading和data
 *
 * @param asyncCallback 需要执行的异步函数
 *
 * @returns 返回异步执行的状态，resolve结果，reject结果，和执行函数
 */
export default function useAsync<
  T extends PromiseFunc<any>,
  V = T extends PromiseFunc<infer U> ? U : any,

  // 反推asyncCallback中promise的类型，例如，得到Promise<string> 中的 string
  // infer 关键字参考: https://zhuanlan.zhihu.com/p/402541135
>(
  asyncCallback: T
): {
  /**
   * 异步状态
   */
  status: UseAsyncStatus;
  /**
   * 执行函数，该执行函数必须拥有和asyncCallback一致的参数需求
   * 此处使用 Parameters 获取函数的参数类型
   */
  execute: (...args: Parameters<T>) => Promise<V>;
  /**
   * resolve的值
   */
  value: V | null;
  /**
   * reject的值
   */
  error: any;
  /**
   * 重置异步数据和状态
   */
  reset: () => void;
  /**
   * 某些情况下可能需要手动设置异步结果
   */
  setValue: (value: V | null) => void;
} {
  const [status, setStatus] = useState<UseAsyncStatus>('idle');
  const [value, setValue] = useState<V | null>(null);
  const [error, setError] = useState<any>(null);

  // 缓存执行函数，处理异步的前后状态
  const execute = useCallback(
    (...params) => {
      return new Promise<V>((resolve, reject) => {
        setStatus('pending');
        setError(null);
        asyncCallback(...params)
          .then((res) => {
            setValue(res);
            setStatus('success');
            resolve(res);
          })
          .catch((res) => {
            setError(res);
            setValue(null);
            setStatus('error');
            reject(res);
          });
      });
    },
    [asyncCallback]
  );
  const reset = useCallback(() => {
    setStatus('idle');
    setValue(null);
    setError(null);
  }, []);
  return {
    status,
    value,
    execute,
    error,
    reset,
    setValue,
  };
}
